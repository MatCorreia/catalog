import "./Skeleton.css"

export const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton skeleton-card-content">
                <div className="skeleton-card-img" />
            </div>
            <div className="skeleton skeleton-card-title" />
        </div>
    )
}

export const SkeletonDetails = () => {
    return (
        <div className="skeleton skeleton-details" />
    )
}