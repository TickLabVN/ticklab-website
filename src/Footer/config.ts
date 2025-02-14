import { GlobalConfig } from "payload"
import { revalidateFooter } from "./hooks/revalidateFooter"

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "quickLinks",
      type: "array",
      label: "Quick Links",
      minRows: 1,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "resources",
      type: "array",
      label: "Resources",
      minRows: 1,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "contact",
      type: "group",
      fields: [
        {
          name: "email",
          type: "text",
          defaultValue: "ticklab.vn@gmail.com",
        },
        {
          name: "address",
          type: "text",
          defaultValue: " 177/19 đường số 6, khu phố Tân Lập, P. Đông Hoà, TP. Dĩ An, tỉnh Bình Dương",
        },
        {
          name: "facebook",
          type: "text",
          defaultValue: "https://www.facebook.com/ticklab.vn",
          admin: {
            description: "Facebook page URL"
          }
        },
        {
          name: "github",
          type: "text",
          defaultValue: "https://github.com/TickLabVN",
          admin: {
            description: "GitHub organization URL"
          }
        },
        {
          name: "youtube",
          type: "text",
          defaultValue: "https://www.youtube.com/@TickLab",
          admin: {
            description: "YouTube channel URL"
          }
        },
      ],
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "companyName",
      type: "text",
      defaultValue: "TickLab",
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
