module.exports.meetingRequestTemplate = ({
  mentorName,
  internName,
  title,
  note
}) => {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f6f8" style="padding: 30px 0; font-family: Arial, Helvetica, sans-serif;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-collapse: collapse; border-radius: 8px;">
          <tr>
            <td bgcolor="#4f46e5" style="padding: 20px; text-align: center; color: #ffffff; font-size: 22px; font-weight: bold;">
              📅 New Meeting Request
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; color: #333333; font-size: 15px; line-height: 1.5;">
              <p style="margin: 0 0 15px;">Hi <strong>${mentorName}</strong>,</p>
              
              <p style="margin: 0 0 20px;">
                <strong>${internName}</strong> has sent you a new meeting request via <strong>InternLink</strong>.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f9fafb" style="border: 1px solid #e5e7eb; border-radius: 6px; padding: 15px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 10px 0;">
                    <strong>📝 Title:</strong> ${title}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <strong>💬 Note:</strong> ${note || 'No additional message provided.'}
                  </td>
                </tr>
              </table>
              <p style="margin: 15px 0 0; font-size: 13px; color: #6b7280; text-align: center;">
                Sign in to your dashboard to accept or decline the request.
              </p>
            </td>
          </tr>

          <tr>
            <td bgcolor="#f3f4f6" style="padding: 15px; text-align: center; font-size: 12px; color: #9ca3af;">
              © ${new Date().getFullYear()} InternLink Platform • All rights reserved
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
  `;
};
module.exports.meetingRequestAcceptanceTemplate = ({
  mentorName,
  internName,
  title,
  note,
  start,
  end
}) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not specified';
    const date = new Date(dateStr);
    const pad = (n) => n.toString().padStart(2, '0');
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  return `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f6f8" style="padding: 30px 0; font-family: Arial, Helvetica, sans-serif;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-collapse: collapse; border-radius: 8px;">
          
          <tr>
            <td bgcolor="#10b981" style="padding: 20px; text-align: center; color: #ffffff; font-size: 22px; font-weight: bold;">
              ✅ Meeting Accepted
            </td>
          </tr>
          
          <tr>
            <td style="padding: 30px; color: #333333; font-size: 15px; line-height: 1.5;">
              <p style="margin: 0 0 15px;">Hi <strong>${internName}</strong>,</p>
              
              <p style="margin: 0 0 20px;">
                Your meeting request has been <strong>accepted</strong> by <strong>${mentorName}</strong>.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f9fafb" style="border: 1px solid #e5e7eb; border-radius: 6px; padding: 15px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 8px 0;">
                    <strong>📝 Title:</strong> ${title}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong>💬 Note:</strong> ${note || 'No additional message provided.'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong>📅 Start:</strong> ${formatDate(start)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong>⏰ End:</strong> ${formatDate(end)}
                  </td>
                </tr>
              </table>

              <p style="margin: 15px 0 0; font-size: 14px; color: #374151;">
                Please log in to your <strong>InternLink dashboard</strong> to view full meeting details and prepare accordingly.
              </p>
            </td>
          </tr>

          <tr>
            <td bgcolor="#f3f4f6" style="padding: 15px; text-align: center; font-size: 12px; color: #9ca3af;">
              © ${new Date().getFullYear()} InternLink Platform • All rights reserved
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
  `;
};

