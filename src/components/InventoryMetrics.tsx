import { Metric } from "../types/types";

type InventoryMetricsProps = {
    metrics: Array<Metric>
}

function InventoryMetrics({metrics}: InventoryMetricsProps) {
    return <div className="flex justify-between w-full my-5 gap-5">

        {metrics.map(m => {
            return <div key={m.key} className="w-100 h-100 shadow-2 border-round p-4 p-2 flex gap-3 items-center">
                <i className={`pi ${m.icon} mt-2`} style={{ fontSize: '1.5rem' }}></i>
                <div>
                    <div className="text-3xl">{m.key}</div>
                    <div className="text-xl">{m.value}</div>
                </div>

            </div>
        })}
    </div>
}

export default InventoryMetrics;