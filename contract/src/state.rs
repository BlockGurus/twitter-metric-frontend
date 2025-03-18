use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use secret_toolkit::storage::Item;
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct EngagementRecord {
    pub tweet_id: String,
    pub points: u64,
    pub engagement_type: String,
    pub created_at: u64,
}

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