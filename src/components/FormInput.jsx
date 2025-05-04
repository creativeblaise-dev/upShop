const FormInput = ({label, ...props}) => {
    return(
        <div className="pt-4 pb">
        <label className="font-bold text-sm block text-stone-900">{label}</label>
        <input
        className=" text-stone-600 p-2  w-75 border-2 shadow rounded-lg border-slate-600 bg-amber-100 text-sm"
         {...props}
        />
      </div>
    )
}

export default FormInput