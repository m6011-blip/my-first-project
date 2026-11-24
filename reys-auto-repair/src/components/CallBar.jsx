import { business } from '../data/business.js'

// Fixed action bar on phones: the two things a driver wants to do.
export default function CallBar() {
  return (
    <div className="callbar">
      <a className="btn btn-primary" href={business.phoneHref}>Call</a>
      <a className="btn btn-ghost" href="#book">Book</a>
    </div>
  )
}
