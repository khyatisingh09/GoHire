import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export const successMessage=(title:string, message:string)=>{
    notifications.show({
        title:title,
        message: message,
        withCloseButton:true,
        icon:<IconCheck style={{width:"90%",height:"90%"}}/>, color:"bright-sun",
        withBorder:true,
        className:"!border-bright-sun-500",
      })
}
export const errorNotificaton=(title: string, message: string)=>{
    notifications.show({
        title:title,
        message: message,
        withCloseButton: true,
        icon: <IconX style={{ width: "90%", height: "90%" }} />,
        color: "red",
        withBorder: true,
        className: "!border-red-500",
    })
}