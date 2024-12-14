import React from "react";
import { InviteInput } from "types";
import styles from '@styles/home.module.css';

type Props = {
    invites: InviteInput[],
    showEventName: boolean,
    showUserName: boolean,
};

const InviteOverview: React.FC<Props> = ({ invites, showEventName, showUserName }: Props) => {
    return (
        <>
            <section>
                <table className={styles.invitesTable}>
                    <thead>
                        <tr>
                            {showEventName && <th className={styles.invitesTableth1}>Event</th>}
                            {!showEventName ? (
                                showUserName && <th className={styles.invitesTableth1}>User</th>
                            ) : (showUserName && <th>Participant</th>)}
                            <th className={styles.invitesTableth2}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invites && invites.length > 0 ? (
                            invites.map((invite, index) => (
                                <tr key={index}>
                                    {showEventName && <td>{invite.event.name}</td>}
                                    {showUserName && <td>{invite.user.name}</td>}
                                    <td>{invite.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>No invites yet...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    )
};

export default InviteOverview;