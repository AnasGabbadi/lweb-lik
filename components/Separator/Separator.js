export const Separator = ({ children, styles }) => {
    const separatorStyle = styles ? { ...styles } : {};
    return (
      <div style={separatorStyle} >
        {children}
      </div>
    );
  };