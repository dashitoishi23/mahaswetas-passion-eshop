export function purchaseEmailTemplate(
  orderId: string,
  productNames: string[],
  amount: number,
  customerName: string
): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Order Confirmation</title>    
    </head>
    <body>
        <h1>Order Confirmation</h1>
        <p>Thank you for your purchase!</p>
        <p>Order ID: ${orderId}</p>
        <p>Customer Name: ${customerName}</p>
        <p>Total Amount: ${amount}</p>
        <p>Products:</p>
        <ul>
            ${productNames.map(name => `<li>${name}</li>`).join("")}
        </ul>
    </body>
    </html>
    `;
}