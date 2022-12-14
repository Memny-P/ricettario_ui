import axios from "axios";
import Swal from "sweetalert2";
import { urlAccounts } from "../endpoints";
import Button from "../utilis/Button";
import customConfirm from "../utilis/customConfirm";
import IndexEntity from "../utilis/IndexEntity";
import { userDTO } from "./auth.models";

export default function IndexUsers() {

    async function makeAdmin(id: string) {
        await doAdmin(`${urlAccounts}/makeAdmin`, id);
    }
    async function removeAdmin(id: string) {
        await doAdmin(`${urlAccounts}/removeAdmin`, id);
    }
    async function doAdmin(url: string, id: string) {
        axios.post(url, JSON.stringify(id), {
            headers: { 'Content-Type': 'application/json' }
        });

        Swal.fire({
            title: 'Success',
            text: 'Operation finished correctly',
            icon: 'success'
        })
    }
    return (
        <IndexEntity<userDTO>
            title="Users"
            url={`${urlAccounts}/listUsers`}
        >
            {users => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user =>
                        <tr key={user.id}>
                            <td>
                                <Button
                                    onClick={() => customConfirm(() => makeAdmin(user.id),
                                        `Do you wish to make ${user.email} an admin?`,  // question confirm
                                        'Do it')}    // confirm
                                >Make admin</Button>
                                <Button
                                    className="btn btn-danger ms-2"
                                    onClick={() => customConfirm(() => removeAdmin(user.id),
                                        `Do you wish to remove ${user.email} an admin?`,  // question confirm
                                        'Do it')}    // confirm
                                >Remove admin</Button>
                            </td>
                            <td>{user.email}</td>
                        </tr>
                    )}
                </tbody>
            </>}
        </IndexEntity>
    )
}