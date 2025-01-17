import React from 'react'
type ErrorModalProps = {
  errors: string[]
  onClose: () => void
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errors, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500">
      <div className="w-1/3 rounded-md bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-semibold text-red-500">
          エラーが発生しました
        </h3>
        <ul className="text-red-500">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorModal
