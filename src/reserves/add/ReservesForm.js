import { useForm } from "react-hook-form";
import './ReservesForm.css';
import Config from "../../config";


const ReservesForm = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => postReserve(buildReserves(data));

    const postReserve = (data) => {
        fetch('/reserve/reserves', {
            headers: { 'Content-Type': 'application/json', 'x-access-token': Config.token },
            method: 'POST',
            body: JSON.stringify(data)
        })

            .then((response) => {
                if (response.ok) {
                    alert("Reserve created");
                    return response.json();

                } else {
                    alert("Reserve duplicate");
                }
            })

            .catch((err) => {
                console.error('Error: ', err);
            });
    }


    const buildReserves = (data) => {
        return { ...data }
    };


    return (
        <>
            <h2>Reserves Form</h2>
            <form className="form-Reserves" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label>Date Check In: </label>
                    <input name="dateCheckIn" ref={register}></input>
                </div>

                <div className="field">
                    <label>Date Check Out: </label>
                    <input name="dateCheckOut" ref={register}></input>
                </div>

                <div className="field">
                    <label>ID User: </label>
                    <input name="idUser" ref={register}></input>
                </div>

                <div className="field">
                    <label>Name User: </label>
                    <input name="nameUser" ref={register}></input>
                </div>

                <div className="field">
                    <label>ID Room: </label>
                    <input name="idRoom" ref={register}></input>
                </div>

                <input className="submit" type="submit"></input>
            </form>
        </>
    );
}

export default ReservesForm;