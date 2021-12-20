import Button from "./button";

export default function NumberInput (props: {
    type: string,
    title: string,
    value: number,
    loading: boolean,
    balance: number,
    onChange: (e: any) => void,
    onSubmit: (e: React.FormEvent) => {},
}) {
    return (
        <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">{props.title}</h2>
        <form onSubmit={props.onSubmit}>
          <input
            type="number"
            step="0.000000000000000001"
            min="0"
            value={props.value}
            onChange={props.onChange}
            placeholder="Ammount"
            className="focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-200 focus:bg-gray-100 rounded-md px-2 py-1"
          />
          <p className="text-sm mt-1">
            {props.type === 'provide' ? 'Your balance:' : 'Available:'}
            <span className="pl-2 font-bold">{props.balance.toFixed(2)}</span>{" "}
            USDT
          </p>
          <Button
          title={props.type === 'provide' ? 'Provide' : 'Withdraw'}
          submit
          loading={props.loading}
          />
        </form>
      </div>
    )
}