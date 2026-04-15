const http = require("node:http");
const { orchestrateSupportQuery } = require("./orchestrator/supportOrchestrator");

const PORT = Number(process.env.PORT || 3000);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(payload, null, 2));
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body is too large."));
      }
    });

    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body."));
      }
    });
  });
}

async function requestHandler(request, response) {
  if (request.method === "GET" && request.url === "/health") {
    sendJson(response, 200, { status: "ok", service: "agentic-customer-support-system" });
    return;
  }

  if (request.method === "POST" && request.url === "/webhook/support") {
    try {
      const payload = await readJsonBody(request);
      const result = orchestrateSupportQuery(payload);
      sendJson(response, result.status === "rejected" ? 400 : 200, result);
    } catch (error) {
      sendJson(response, 400, { status: "rejected", error: error.message });
    }
    return;
  }

  sendJson(response, 404, {
    status: "not-found",
    endpoints: ["GET /health", "POST /webhook/support"]
  });
}

if (require.main === module) {
  http.createServer(requestHandler).listen(PORT, () => {
    console.log(`Agentic support webhook running at http://localhost:${PORT}`);
  });
}

module.exports = { requestHandler };
