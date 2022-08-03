/* This example requires Tailwind CSS v2.0+ */
import { XCircleIcon } from '@heroicons/react/solid'

export const AlertError = ({title, message}) => {
    return(
        /// @dev Adjust width of alert (1st one) & add animation.
        <div className="rounded-md bg-red-50 p-4 w-1/3">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{title}</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <p>
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}