export const getBillingReceiptHTML = (
  patientName: string,
  total: number,
  discount: number,
  tax: number,
  net: number,
  method: string
) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Billing Receipt</h2>
    <p>Hi ${patientName},</p>
    <p>Here is the summary of your recent billing:</p>
    <ul>
      <li><strong>Total Amount:</strong> $${total}</li>
      <li><strong>Discount:</strong> $${discount}</li>
      <li><strong>Tax:</strong> $${tax}</li>
      <li><strong>Net Payable:</strong> $${net}</li>
      <li><strong>Payment Method:</strong> ${method}</li>
    </ul>
    <p>Thank you for your visit!</p>
    <br />
    <p>Regards,<br /><strong>Clinic Team</strong></p>
  </div>
`;
