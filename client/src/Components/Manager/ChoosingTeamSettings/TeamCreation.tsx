import React, { useState, useEffect } from 'react'

export default function TeamCreation() {
  const [loading, setLoading] = useState<boolean>(true)

  return (
    <div>
      {loading && (
        <div>
          <h1>Creating Team...</h1>
          <h3>Hold tight!</h3>
        </div>
      )}
    </div>
  )
}
