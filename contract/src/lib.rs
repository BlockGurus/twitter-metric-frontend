use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError, StdResult,
};
use secret_toolkit::storage::Item;
use secret_toolkit::viewing_key::{ViewingKey, ViewingKeyStore};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

// Define state for the contract
pub struct State {
    pub owner: Item<String>,
    pub engagement_data: Item<HashMap<String, Vec<EngagementRecord>>>,
}

impl Default for State {
    fn default() -> Self {
        Self {
            owner: Item::new("owner"),
            engagement_data: Item::new("engagement_data"),
        }
    }
}

// Define structure for engagement records
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct EngagementRecord {
    pub tweet_id: String,
    pub points: u64,
    pub engagement_type: String,
    pub created_at: u64,
}

// Messages that can be sent to the contract
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    // Store engagement data for a user
    StoreEngagement {
        user_id: String,
        tweet_id: String,
        points: u64,
        engagement_type: String,
    },
    // Create a viewing key for a user
    CreateViewingKey { entropy: String },
    // Set a viewing key for a user
    SetViewingKey { key: String },
}

// Query messages that can be sent to the contract
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    // Get engagement data for a user
    GetUserEngagement {
        user_id: String,
        viewing_key: String,
    },
}

// Response for GetUserEngagement query
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct EngagementResponse {
    pub engagements: Vec<EngagementRecord>,
}

// Initialize the contract
#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    _msg: {},
) -> StdResult<Response> {
    let state = State::default();
    
    // Set contract owner to the message sender
    state.owner.save(deps.storage, &info.sender.to_string())?;
    
    // Initialize empty engagement data
    state.engagement_data.save(deps.storage, &HashMap::new())?;

    Ok(Response::new().add_attribute("action", "instantiate"))
}

// Handle execute messages
#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::StoreEngagement { user_id, tweet_id, points, engagement_type } => {
            execute_store_engagement(deps, env, info, user_id, tweet_id, points, engagement_type)
        },
        ExecuteMsg::CreateViewingKey { entropy } => {
            execute_create_viewing_key(deps, env, info, entropy)
        },
        ExecuteMsg::SetViewingKey { key } => {
            execute_set_viewing_key(deps, info, key)
        },
    }
}

// Store engagement data for a user
fn execute_store_engagement(
    deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    user_id: String,
    tweet_id: String,
    points: u64,
    engagement_type: String,
) -> StdResult<Response> {
    let state = State::default();
    
    // Get existing engagement data
    let mut engagement_data = state.engagement_data.load(deps.storage)?;
    
    // Create new engagement record
    let record = EngagementRecord {
        tweet_id,
        points,
        engagement_type,
        created_at: env.block.time.seconds(),
    };
    
    // Add record to user's engagement data
    let user_engagements = engagement_data.entry(user_id.clone()).or_insert_with(Vec::new);
    user_engagements.push(record);
    
    // Save updated engagement data
    state.engagement_data.save(deps.storage, &engagement_data)?;
    
    Ok(Response::new()
        .add_attribute("action", "store_engagement")
        .add_attribute("user_id", user_id))
}

// Create a viewing key for a user
fn execute_create_viewing_key(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    entropy: String,
) -> StdResult<Response> {
    let viewing_key = ViewingKey::create(
        deps.storage,
        &info,
        &env,
        info.sender.as_str(),
        entropy.as_bytes(),
    );
    
    Ok(Response::new()
        .add_attribute("action", "create_viewing_key")
        .add_attribute("viewing_key", viewing_key.to_string()))
}

// Set a viewing key for a user
fn execute_set_viewing_key(
    deps: DepsMut,
    info: MessageInfo,
    key: String,
) -> StdResult<Response> {
    ViewingKey::set(deps.storage, info.sender.as_str(), &key);
    
    Ok(Response::new()
        .add_attribute("action", "set_viewing_key")
        .add_attribute("viewing_key", key))
}

// Handle query messages
#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetUserEngagement { user_id, viewing_key } => {
            query_user_engagement(deps, user_id, viewing_key)
        },
    }
}

// Query user engagement data
fn query_user_engagement(deps: Deps, user_id: String, viewing_key: String) -> StdResult<Binary> {
    let state = State::default();
    
    // Validate viewing key
    let is_valid = ViewingKey::check(deps.storage, user_id.as_str(), &viewing_key);
    if !is_valid {
        return Err(StdError::generic_err("Invalid viewing key"));
    }
    
    // Get engagement data
    let engagement_data = state.engagement_data.load(deps.storage)?;
    
    // Get user's engagement records
    let user_engagements = engagement_data.get(&user_id).cloned().unwrap_or_default();
    
    // Create response
    let response = EngagementResponse {
        engagements: user_engagements,
    };
    
    to_binary(&response)
} 