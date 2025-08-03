export const getInventoryAlertHTML = (
  item: string,
  quantity: number
) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>⚠️ Inventory Alert</h2>
    <p>The stock for <strong>${item}</strong> has dropped below the threshold.</p>
    <p>Current Quantity: <strong>${quantity}</strong></p>
    <p>Please restock as soon as possible.</p>
    <br />
    <p>Regards,<br /><strong>Clinic Inventory System</strong></p>
  </div>
`;
