import { Menu, Indicator, rem, Notification } from '@mantine/core';
import { IconBellPlus, IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getNotification, readNotification } from '../Services/NotiService';

const NotiMenu = () => {
    const user = useSelector((state: any) => state.user);
    const [notifications, setNotifications] = useState<any>([]);
    const [opened, setOpened] = useState(false);
    useEffect(() => {
        getNotification(user.id).then((res) => {
            console.log(res);
            setNotifications(res);
        }).catch((err) => console.log(err));
    }, [user]);
    const unread = (index:number) =>{
        let notis = [...notifications];
        notis = notis.filter((notis:any, i:number)=> i!==index);
        setNotifications(notis);

        readNotification(notis[index].id).then((res)=>console.log(res)).catch((err)=>console.log(err));
        console.log(notis);
    }
    return (
        <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
            <Menu.Target>
                <div className="bg-mine-shaft-900 p-1.5 rounded-full">
                    <Indicator inline processing color="bright-sun" offset={4} size={12}>
                        <IconBellPlus stroke={1.5} />
                    </Indicator>
                </div>
            </Menu.Target>
            <Menu.Dropdown onChange={() => setOpened(true)}>
                <div className="flex flex-col gap-2">
                    {
                        notifications.map((noti: any, index:number) => <Notification key={index}
                        className="hover:bg-mine-shaft-900 cursor-pointer" onClose={()=>unread(index)}
                        icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
                        color="teal"
                        title={noti.action}
                        mt="md">
                        {noti.message}
                        </Notification>
                     )}
                     {
                        notifications.length === 0 ? <div className="text-center text-mine-shaft-300">No Notifications</div> : <></>
                     }
                </div>
                <Menu.Divider />
            </Menu.Dropdown>
        </Menu>
    );
}
export default NotiMenu;