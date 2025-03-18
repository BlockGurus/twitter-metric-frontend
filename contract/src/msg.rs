use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    StoreEngagement {
        user_id: String,
        tweet_id: String,
        points: u64,
        engagement_type: String,
    },
    CreateViewingKey {
        entropy: String,
    },
    SetViewingKey {
        key: String,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GetUserEngagement {
        user_id: String,
        viewing_key: String,
    },
} 