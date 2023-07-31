import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="footer footer-center gap-2 p-4 bg-base-200 text-base-content rounded h-[120px]">
      <div className="grid grid-flow-col gap-4">
        <span className="font-bold">PetComm</span>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <Link to={"https://github.com/ill2sam"}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0.55127C3.58 0.55127 0 3.97554 0 8.20326C0 11.5893 2.29 14.4492 5.47 15.4631C5.87 15.53 6.02 15.3005 6.02 15.0996C6.02 14.9179 6.01 14.3153 6.01 13.6744C4 14.0283 3.48 13.2058 3.32 12.7753C3.23 12.5553 2.84 11.8762 2.5 11.6945C2.22 11.551 1.82 11.1971 2.49 11.1875C3.12 11.178 3.57 11.7423 3.72 11.9719C4.44 13.1292 5.59 12.804 6.05 12.6032C6.12 12.1058 6.33 11.771 6.56 11.5797C4.78 11.3884 2.92 10.7284 2.92 7.80153C2.92 6.96938 3.23 6.2807 3.74 5.74506C3.66 5.55376 3.38 4.76943 3.82 3.71728C3.82 3.71728 4.49 3.51642 6.02 4.50161C6.66 4.32944 7.34 4.24336 8.02 4.24336C8.7 4.24336 9.38 4.32944 10.02 4.50161C11.55 3.50685 12.22 3.71728 12.22 3.71728C12.66 4.76943 12.38 5.55376 12.3 5.74506C12.81 6.2807 13.12 6.95981 13.12 7.80153C13.12 10.738 11.25 11.3884 9.47 11.5797C9.76 11.8188 10.01 12.278 10.01 12.9953C10.01 14.0188 10 14.8414 10 15.0996C10 15.3005 10.15 15.5396 10.55 15.4631C13.71 14.4492 16 11.5797 16 8.20326C16 3.97554 12.42 0.55127 8 0.55127Z"
                fill="#24292F"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div>
        <p>
          <span className="font-bold">Contact</span> mercone13@gmail.com
        </p>
      </div>
    </footer>
  )
}