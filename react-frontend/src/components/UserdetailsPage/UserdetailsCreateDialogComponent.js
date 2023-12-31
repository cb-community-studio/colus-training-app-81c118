import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const UserdetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [users, setusers] = useState([])
    const [users, setusers] = useState([])

    useEffect(() => {
        set_entity({});
    }, [props.show]);
    const onSave = async () => {
        let _data = {
            firstname: _entity.firstname,
            lastname: _entity.lastname,
            email: _entity.email,
            organization: _entity.organization,
            department: _entity.department,
            mobile: _entity.mobile,
        };

        setLoading(true);
        try {
            const result = await client.service("userdetails").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };
     useEffect(() => {
                //on mount
                client
                    .service("users")
                    .find({ query: { $limit: 100 } })
                    .then((res) => {
                        setusers(res.data);
                    })
                    .catch((error) => {
                        console.log({ error });
                        props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                    });
            }, []);
    useEffect(() => {
                //on mount
                client
                    .service("users")
                    .find({ query: { $limit: 100 } })
                    .then((res) => {
                        setusers(res.data);
                    })
                    .catch((error) => {
                        console.log({ error });
                        props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                    });
            }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    const usersOptions = users.map((elem) => ({ label: elem.name, value: elem._id }));
    const usersOptions = users.map((elem) => ({ label: elem.email, value: elem._id }));

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="userdetails-create-dialog-component">
            <div>
                <p className="m-0">First Name:</p>
                <Dropdown value={_entity?.firstname} options={usersOptions} onChange={(e) => setValByKey("firstname", e.value)} />
            </div>
            <div>
                <p className="m-0">Last Name:</p>
                <InputText className="w-full mb-3" value={_entity?.lastname} onChange={(e) => setValByKey("lastname", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">email:</p>
                <Dropdown value={_entity?.email} options={usersOptions} onChange={(e) => setValByKey("email", e.value)} />
            </div>
            <div>
                <p className="m-0">Organization:</p>
                <InputText className="w-full mb-3" value={_entity?.organization} onChange={(e) => setValByKey("organization", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Department:</p>
                <InputText className="w-full mb-3" value={_entity?.department} onChange={(e) => setValByKey("department", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Mobile Number:</p>
                <InputText className="w-full mb-3" value={_entity?.mobile} onChange={(e) => setValByKey("mobile", e.target.value)}  />
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    return {}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(UserdetailsCreateDialogComponent);
