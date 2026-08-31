# Security model

No private key or server signer exists in the application. Public policy and translation artifacts are treated as untrusted and digest-bound. VecDB is retrieval context only. Approved translations are indexes into submitted candidates, never model-invented strings. Release commitments are immutable records.
