use actix_web::{App, HttpServer, http};
use dotenv::dotenv;
use std::env;
use actix_cors::Cors;

mod handlers;
mod models;
mod services;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();

    let host = env::var("HOST").unwrap_or_else(|_| "127.0.0.1".to_string());
    let port = env::var("PORT").unwrap_or_else(|_| "4000".to_string());

    println!("{}", format!("{}:{}", host, port));
    HttpServer::new(|| {
        App::new()
            .wrap(
                Cors::default()
                    .allowed_origin("http://127.0.0.1:3000") // Додайте адресу вашого клієнта
                    .allowed_methods(vec!["GET", "POST"])
                    .allowed_headers(vec![http::header::CONTENT_TYPE])
                    .max_age(3600),
            )
            .service(handlers::contract::get_contract_data)
            // Можна додати більше сервісів тут
    })
    .bind((host, port.parse::<u16>().unwrap()))?
    .run()  
    .await
}
