use actix_web::{get, web, HttpResponse, Responder};
use serde::Deserialize;

#[derive(Deserialize)]
struct ContractDataRequest {
    address: String,
}

#[get("/api/get-contract-data")]
async fn get_contract_data(query: web::Query<ContractDataRequest>) -> impl Responder {
    // Використайте адресу з `query.address` для виконання бізнес-логіки
    println!("Received address: {}", query.address);

    // Тут ви можете викликати сервісний метод для обробки даних
    let response_data = format!("Contract data for address: {}", query.address);

    HttpResponse::Ok().body(response_data)
}
