const nodemailer = require('nodemailer');
const QRCode = require('qrcode');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendBookingConfirmation = async (booking) => {
  try {
    // Generate QR code
    const qrCodeDataURL = await QRCode.toDataURL(booking.eTicket.qrCode);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: booking.user.email,
      subject: `Booking Confirmation - ${booking.tour.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FFD700, #FFA500); padding: 20px; text-align: center;">
            <h1 style="color: #000; margin: 0;">🐝 Tripzybee</h1>
            <p style="color: #000; margin: 10px 0;">Your Adventure Awaits!</p>
          </div>
          
          <div style="padding: 30px; background: #fff;">
            <h2 style="color: #333;">Booking Confirmed!</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Trip Details</h3>
              <p><strong>Tour:</strong> ${booking.tour.title}</p>
              <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
              <p><strong>E-Ticket:</strong> ${booking.eTicket.ticketNumber}</p>
              <p><strong>Start Date:</strong> ${booking.startDate.toDateString()}</p>
              <p><strong>Travelers:</strong> ${booking.travelers.length}</p>
              <p><strong>Total Amount:</strong> ₹${booking.totalPrice}</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <img src="${qrCodeDataURL}" alt="QR Code" style="width: 200px; height: 200px;">
              <p style="color: #666;">Show this QR code at the departure point</p>
            </div>

            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border: 1px solid #ffeaa7;">
              <h4 style="color: #856404; margin-top: 0;">Important Information</h4>
              <ul style="color: #856404;">
                <li>Carry a printed copy of this e-ticket</li>
                <li>Arrive 30 minutes before departure</li>
                <li>Carry valid ID proof</li>
                <li>Check weather conditions before travel</li>
              </ul>
            </div>
          </div>

          <div style="background: #333; color: #fff; padding: 20px; text-align: center;">
            <p>Need help? Contact us at support@tripzybee.com</p>
            <p>Happy Travels! 🌟</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent');
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

const generateETicket = async (booking) => {
  // This would generate a PDF e-ticket
  // Implementation would use jsPDF or similar library
  return {
    ticketNumber: booking.eTicket.ticketNumber,
    qrCode: booking.eTicket.qrCode
  };
};

module.exports = {
  sendBookingConfirmation,
  generateETicket
};