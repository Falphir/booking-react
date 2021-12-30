import { useForm } from "react-hook-form";
import './ReservesForm.css';
import Config from "../../../../config";


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
                    console.log(response);
                    alert("Reserve created");
                    return response.json();

                } else {
                    console.log(response);
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
                    <input {...register('dateCheckIn')}></input>
                </div>

                <div className="field">
                    <label>Date Check Out: </label>
                    <input {...register('dateCheckOut')}></input>
                </div>

                <div className="field">
                    <label>ID User: </label>
                    <input {...register('idUser')}></input>
                </div>

                <div className="field">
                    <label>Name User: </label>
                    <input {...register('nameUser')}></input>
                </div>

                <div className="field">
                    <label>ID Room: </label>
                    <input {...register('idRoom')}></input>
                </div>

                <input className="submit" type="submit"></input>
            </form>
        </>
    );
}

export default ReservesForm;