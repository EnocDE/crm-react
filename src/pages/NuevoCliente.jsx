import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/Clientes";

export async function action({ request }) {
    const formD = await request.formData();
    
    const datos = Object.fromEntries(formD);

    const email = formD.get("email");

    const errores = [];
    if (Object.values(datos).includes("")) {
        errores.push("Todos los campos son obligatorios");
        
    }

    let regex = new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );

    if (!regex.test(email)) {
        errores.push("El email no es válido");
    }

    if (Object.keys(errores).length) {
        return errores;
    }

    await agregarCliente(datos);

    return redirect('/');
}

function NuevoCliente() {
    const errores = useActionData();
    const navigate = useNavigate();

    console.log(errores);
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Nuevo cliente</h1>
            <p className="mt-3">
                LLena todos los campos para registrar todos los clientes
            </p>

            <div className="flex justify-end">
                <button
                    onClick={() => navigate("/")}
                    type="button"
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase">
                    Volver
                </button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-5">
                {errores?.length &&
                    errores.map((error, index) => (
                        <Error key={index}>
                            <p>{error}</p>
                        </Error>
                    ))}

                <Form method="POST" noValidate>
                    <Formulario />
                    <input
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:bg-blue-900"
                        type="submit"
                        value="Registrar cliente"
                    />
                </Form>
            </div>
        </>
    );
}

export default NuevoCliente;
