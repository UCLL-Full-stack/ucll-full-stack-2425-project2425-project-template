import { Shoppingcart } from '@types';

type Props = {
    shoppingcarts: Shoppingcart[] | [];
};

const ShoppingcartOverview: React.FC<Props> = ({ shoppingcarts }: Props) => {
    return (
        <div>
            {shoppingcarts.map((shoppingcart) => (
                <div
                    key={shoppingcart.id}
                    className="flex items-center justify-between p-4 border-b border-gray-200"
                >
                    <div>
                        <h3 className="text-lg font-semibold">{shoppingcart.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShoppingcartOverview;
