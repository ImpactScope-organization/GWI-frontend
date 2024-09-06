const environment = "staging";

let apiUrl;
if (environment === "production") {
  apiUrl = "https://gwi-backend.dev.impactscope.com";
} else if (environment === "staging") {
  apiUrl = "https://gwi-backend-v2.impactscope.com";
} else if (environment === "cess-sepolia") {
  apiUrl = "https://gwi-cess-be.impactscope.com";
} else {
  apiUrl = "http://localhost:5001";
}

export default apiUrl;
