const Button = ({
  title,
  children,
  disabled,
  onClick,
  type = 'button',
  href,
}) => {
  if (href) {
    return (
      <a href={href} className={'linkButton'}>
        {title || children}
      </a>
    );
  }

  return (
    <button onClick={onClick} type={type} disabled={disabled}>
      {title || children}
    </button>
  );
};

export default Button;
