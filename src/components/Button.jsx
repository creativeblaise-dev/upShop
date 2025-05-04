export default function Button({children, classes, ...props}){
    return (
        <button className={classes} {...props} >
            {children}
        </button>
    )
}