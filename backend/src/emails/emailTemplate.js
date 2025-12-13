export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Orbit Connect</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
    <div style="background: linear-gradient(to right, #FFF700, #01B7A6); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; ">
      <h1 style="color: #333; margin: 0; font-size: 28px; font-weight: 500;">Welcome to Orbit Connect!</h1>
    </div>
    <div style="background-color: #ffffff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
      <p style="font-size: 18px; color: #01B7A6;"><strong>Hello ${name},</strong></p>
       <p>
        Thanks for joining <strong>Orbit Connect</strong> — a fast, simple, and secure way to stay connected with the people who matter most.
      </p>

      <p>
        With Orbit Connect, you can:
      </p>

      <ul style="padding-left: 20px; margin: 15px 0;">
        <li>💬 Chat in real-time with friends and teams</li>
        <li>🌍 Stay connected anytime, anywhere</li>
        <li>🔒 Enjoy a secure and reliable messaging experience</li>
      </ul>

       <p>
        You’re all set! Click the button below to start your first conversation.
      </p>
      
        <div style="text-align: center; margin: 30px 0;">
        <a 
          href="${clientURL}" 
          style="background: linear-gradient(to right, #FFF700, #01B7A6); color: #333; text-decoration: none; padding: 12px 34px; border-radius: 50px; font-weight: 500; display: inline-block;"
        >
          Open Orbit Connect
        </a>
      </div>
      
      <p style="margin-bottom: 5px;">
        Need help or have questions? Our team is always happy to assist you.
      </p>
      <p style="margin-top: 0;">
        Let’s get the conversation started 🚀
      </p>
      
      <p style="margin-top: 25px; margin-bottom: 0;">
        Warm regards,<br />
        <strong>The Orbit Connect Team</strong>
      </p>
    </div>
    
    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
      <p>© 2025 Orbit Connect. All rights reserved.</p>
      <p>
        <a href="#" style="color: #01B7A6; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
        <a href="#" style="color: #01B7A6; text-decoration: none; margin: 0 10px;">Terms of Service</a>
        <a href="#" style="color: #01B7A6; text-decoration: none; margin: 0 10px;">Contact Us</a>
      </p>
    </div>
  </body>
  </html>
  `;
}
