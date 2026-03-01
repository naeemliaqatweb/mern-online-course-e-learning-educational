// registerVerificationTemplate.js
import { header } from './partials/header.js';
import { footer } from './partials/footer.js';

export const registerVerificationTemplate = (name, verificationCode, logoUrl = '') => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - Online Course E Learning</title>
    <style>
      @media screen and (max-width: 600px) {
        .container { width: 100% !important; }
        .content-padding { padding: 20px !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#f1f5f9; font-family:-apple-system, BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">

    <div style="display:none; max-height:0; overflow:hidden;">
      Verify your email to activate your Online Course E Learning account.
    </div>

    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f1f5f9;">
      <tr>
        <td style="padding:20px 0;">
          <table class="container" width="600" align="center" cellspacing="0" cellpadding="0" border="0" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 6px rgba(0,0,0,0.1); margin:0 auto;">

            <!-- Header -->
            ${header(logoUrl)}

            <!-- Main Content -->
            <tr>
              <td class="content-padding" style="padding:40px 40px 30px;">
                <h2 style="color:#1e293b; font-size:24px; font-weight:600; text-align:center; margin:0 0 20px;">
                  Verify Your Email
                </h2>

                <p style="color:#334155; font-size:16px; line-height:1.6; margin:0 0 20px;">
                  Hello <strong style="color:#fb923c;">${name || "User"}</strong>,
                </p>

                <p style="color:#64748b; font-size:16px; line-height:1.6; margin:0 0 30px;">
                  Thanks for registering with Online Course E Learning! Please verify your email by entering the 6-digit code below:
                </p>

                <!-- Verification Code -->
                <div style="text-align:center; margin:30px 0;">
                  ${verificationCode
                    .split("")
                    .map(
                      (digit) => `
                      <span style="
                        display:inline-block;
                        border:2px solid #fb923c;
                        border-radius:8px;
                        padding: 6px 14px;
                        margin: 0 5px;
                        font-size: 18px;
                        font-weight:600;
                        color:#1e293b;
                        background:#fff7ed;
                        font-family:monospace;
                      ">
                        ${digit}
                      </span>
                    `
                    )
                    .join("")}
                </div>

                <p style="color:#64748b; font-size:15px; line-height:1.6; margin:30px 0 0;">
                  This code will expire in <strong>10 minutes</strong>. If you did not sign up, please ignore this email.
                </p>

                <p style="color:#64748b; font-size:15px; line-height:1.6; margin:25px 0 0;">
                  Best regards,<br>
                  <strong style="color:#fb923c;">The Online Course E Learning Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            ${footer}

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;
