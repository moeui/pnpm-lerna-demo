import { Button, ConfigProvider, theme, type ButtonProps } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo } from 'react';

const { useToken } = theme;

interface IProps extends ButtonProps {
  width?: number;
  height?: number;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
}

export const useStyles = createStyles(({ css, responsive }) => ({
  wrapper: css`
    width: 200px;
    margin: 0 auto;
    ${responsive.sm} {
      width: auto;
    }
  `,
}));

const GradientButton = memo(({ width, height, children, style, className, ...rest }: IProps) => {
  const { token } = useToken();
  const { styles } = useStyles();

  const primaryGradient = token.Button?.defaultHoverBg;

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: primaryGradient,
            defaultHoverBg: `linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), ${primaryGradient}`,
            defaultColor: 'black',
            defaultBorderColor: 'none',
            fontSize: 16,
          },
        },
      }}
    >
      <Button className={classNames(styles.wrapper, className)} style={{ width, height, ...style }} {...rest}>
        {children}
      </Button>
    </ConfigProvider>
  );
});

export default GradientButton;
