export const ButtonLink = ({destination, label}) => {
    return (
        <a className="btn" href={destination}>
            <span style={{ verticalAlign: '-webkit-baseline-middle' }}>{label}</span>
        </a>
    );
};