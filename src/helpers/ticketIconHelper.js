import { MdNewReleases, MdOutlineCheckBox } from 'react-icons/md'

export const ticketIconHelper = (severity, status) => {
  return status === 'done' ? (
    <MdOutlineCheckBox className="grey" />
  ) : (
    <MdNewReleases
      className={severity === 'high' ? 'red' : severity === 'avg' ? 'orange' : 'yellow'}
    />
  )
}
