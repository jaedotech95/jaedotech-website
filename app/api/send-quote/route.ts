import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { company, name, phone, email, message, file, selectedProducts } = body

    const productsTable =
      selectedProducts && selectedProducts.length > 0
        ? `
    <h3 style="color: #0055A6; margin-top: 20px;">선택된 제품</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <thead>
        <tr style="background-color: #0055A6; color: white;">
          <th style="padding: 10px; border: 1px solid #ddd;">NO</th>
          <th style="padding: 10px; border: 1px solid #ddd;">제품명</th>
          <th style="padding: 10px; border: 1px solid #ddd;">규격</th>
          <th style="padding: 10px; border: 1px solid #ddd;">수량</th>
          <th style="padding: 10px; border: 1px solid #ddd;">단가</th>
          <th style="padding: 10px; border: 1px solid #ddd;">금액</th>
        </tr>
      </thead>
      <tbody>
        ${selectedProducts
          .map(
            (p: any, i: number) => `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${i + 1}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${p.name}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${p.specifications.width}×${p.specifications.depth}×${p.specifications.height}, ${p.specifications.levels}, ${p.specifications.type}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${p.quantity}세트</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${p.unitPrice.toLocaleString()}원</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${(p.unitPrice * p.quantity).toLocaleString()}원</td>
          </tr>
        `,
          )
          .join("")}
        <tr style="background-color: #f0f0f0; font-weight: bold;">
          <td colspan="5" style="padding: 10px; border: 1px solid #ddd; text-align: right;">총 금액 (VAT 포함)</td>
          <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">
            ${selectedProducts
              .reduce((sum: number, p: any) => sum + p.unitPrice * p.quantity * 1.1, 0)
              .toLocaleString()}원
          </td>
        </tr>
      </tbody>
    </table>
    `
        : "<p>선택된 제품이 없습니다.</p>"

    const fileInfo = file
      ? `
    <div style="margin-top: 20px;">
      <h3 style="color: #0055A6;">첨부파일</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5; width: 120px; font-weight: bold;">파일명</td>
          <td style="padding: 8px;">${file.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5; font-weight: bold;">파일 크기</td>
          <td style="padding: 8px;">${(file.size / 1024).toFixed(2)} KB</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5; font-weight: bold;">파일 형식</td>
          <td style="padding: 8px;">${file.type || "알 수 없음"}</td>
        </tr>
        ${
          file.url
            ? `
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5; font-weight: bold;">다운로드</td>
          <td style="padding: 8px;">
            <a href="${file.url}" style="color: #0055A6; text-decoration: underline;" target="_blank">파일 다운로드</a>
          </td>
        </tr>
        `
            : ""
        }
      </table>
    </div>
    `
      : ""

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>견적 문의</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #0055A6; border-bottom: 3px solid #0055A6; padding-bottom: 10px;">
      견적 문의가 접수되었습니다
    </h2>
    
    <div style="margin-top: 20px;">
      <h3 style="color: #0055A6;">고객 정보</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5; width: 120px; font-weight: bold;">회사명</td>
          <td style="padding: 8px;">${company}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5; font-weight: bold;">이름</td>
          <td style="padding: 8px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5; font-weight: bold;">연락처</td>
          <td style="padding: 8px;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5; font-weight: bold;">이메일</td>
          <td style="padding: 8px;">${email}</td>
        </tr>
      </table>
    </div>

    <div style="margin-top: 20px;">
      <h3 style="color: #0055A6;">문의 내용</h3>
      <div style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #0055A6;">
        ${message.replace(/\n/g, "<br>")}
      </div>
    </div>

    ${productsTable}

    ${fileInfo}

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
      <p>이 메일은 JAEDOTECH 웹사이트의 견적 문의 폼을 통해 자동으로 발송되었습니다.</p>
    </div>
  </div>
</body>
</html>
    `

    const { data, error } = await resend.emails.send({
      from: "JAEDOTECH <onboarding@resend.dev>", // Use verified domain in production
      to: ["jaedotech95@gmail.com"],
      subject: `견적 문의 - ${company} (${name})`,
      html: emailHtml,
    })

    if (error) {
      console.error("[v0] Error sending email:", error)
      return NextResponse.json(
        {
          success: false,
          message: "이메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        },
        { status: 500 },
      )
    }

    console.log("[v0] Email sent successfully:", data)

    return NextResponse.json({
      success: true,
      message: "견적 문의가 성공적으로 전송되었습니다!",
    })
  } catch (error) {
    console.error("[v0] Error processing quote:", error)
    return NextResponse.json(
      {
        success: false,
        message: "견적 문의 처리 중 오류가 발생했습니다.",
      },
      { status: 500 },
    )
  }
}
