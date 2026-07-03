export default function DeployInfo() {
  const commitSha = import.meta.env.VITE_COMMIT_SHA || 'local-dev'
  const shortSha = commitSha.slice(0, 7)

  return (
    <footer className="deploy-info">
      <span>Deployed commit:</span>
      <code>{shortSha}</code>
    </footer>
  )
}
