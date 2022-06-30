export default function AlertMessage({
    title
}) {
    return <div className="alert alert-primary" role="alert">
        {title}
    </div>
}