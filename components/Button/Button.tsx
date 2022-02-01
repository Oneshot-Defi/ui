import classnames from 'classnames'
import { Protocol } from 'types/Oneshot.types'

export enum ButtonShape {
  Regular,
  Circular,
  Wide,
}

export enum ButtonType {
  Primary = 'Primary',
}

export enum ButtonSize {
  Small,
  Large,
  ExtraLarge,
}

type ButtonProps = {
  size: ButtonSize
  protocolCssClass: string
  buttonShape?: ButtonShape
  onClick?: (any) => any
  children: any
}

function Button({
  size,
  protocolCssClass,
  buttonShape = ButtonShape.Regular,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      // TODO this shouldn't be a switch statement on the protocol name, it should just pull the correct css classes from the transaction library
      className={classnames('text-white py-2 px-4 rounded-lg', {
        'rounded-full w-24 h-24': buttonShape === ButtonShape.Circular,
        'w-40': buttonShape === ButtonShape.Wide,
        'text-xs font-bold': size === ButtonSize.Small,
        'text-xl': size === ButtonSize.Large,
        'text-4xl': size === ButtonSize.ExtraLarge,
        'bg-aave hover:bg-aave-dark active:bg-aave-darker':
          protocolCssClass === Protocol.Aave,
        'bg-balancer hover:bg-balancer-dark active:bg-balancer-darker':
          protocolCssClass === Protocol.Balancer,
        'bg-compound hover:bg-compound-dark active:bg-compound-darker':
          protocolCssClass === Protocol.Compound,
        'bg-stakeDao hover:bg-stakeDao-dark active:bg-stakeDao-darker':
          protocolCssClass === Protocol.StakeDao,
        'bg-uniswap hover:bg-uniswap-dark active:bg-uniswap-darker':
          protocolCssClass === Protocol.Uniswap,
        'bg-purple hover:bg-purple-dark active:bg-purple-darker':
          protocolCssClass === ButtonType.Primary || Protocol.OneshotBuidl,
      })}
    >
      {children}
    </button>
  )
}

export default Button
