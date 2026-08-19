# comparia-landing Helm chart

Deploys the ComparIA landing page (this repo's `app/`) as a Deployment +
Service on a Kubernetes cluster, with an optional Ingress. The typical
topology is a shared domain where this app owns `/` and the arena app (the
`comparia` chart, in [betagouv/ComparIA](https://github.com/betagouv/ComparIA))
sits at a subpath (`/arena` by default) with its own Ingress rule on the
same host — set `ingress.enabled` here and `ingress.path: /arena` on the
comparia chart.

## Install

```bash
helm install comparia-landing devops/helm/comparia-landing
```

Every value has a usable default; nothing is required. Point
`config.arenaUrl` at wherever the arena app is actually reachable from the
browser before going to production — the default (`/arena`) only works if
both apps sit behind the same reverse proxy/Ingress on the same origin.

## Values

| Value                     | Default                            | Description                                          |
| --------------------------- | ------------------------------------ | ------------------------------------------------------- |
| `image.repository`        | `ghcr.io/betagouv/comparia-landing` | Image                                                 |
| `image.tag`                | `.Chart.AppVersion`                 | Image tag, independent of the chart version           |
| `image.pullPolicy`         | `IfNotPresent`                      |                                                        |
| `image.pullSecrets`        | `[]`                                 | List of `imagePullSecrets` names                      |
| `replicaCount`             | `1`                                  |                                                        |
| `service.port`             | `80`                                 |                                                        |
| `resources`                | see `values.yaml`                   | Requests/limits                                        |
| `serviceAccount.create`    | `true`                               | Create a ServiceAccount for the release                |
| `serviceAccount.name`      | `""`                                 | Name to use; defaults to the release fullname          |
| `serviceAccount.annotations` | `{}`                               | Annotations on the created ServiceAccount               |
| `config.arenaUrl`          | `/arena`                             | `PUBLIC_ARENA_URL` — a relative path if both apps share an origin, or a full URL otherwise |
| `config.matomoUrl`         | `""`                                 | `MATOMO_URL`. Left empty (with `matomoId`), the tracker is left out of the page |
| `config.matomoId`          | `""`                                 | `MATOMO_ID`                                            |
| `config.gitCommit`         | `""`                                 | `PUBLIC_GIT_COMMIT`, shown in the app footer            |
| `extraEnv`                 | `[]`                                 | Extra env vars, for anything not covered by `config.*` above, same shape as a container's `env:` list |
| `ingress.enabled`          | `false`                              | Create an Ingress routing "/" on `ingress.host` to this release |
| `ingress.className`        | `""`                                 | `spec.ingressClassName`                                |
| `ingress.host`             | `""`                                 | Required when `ingress.enabled` is true                |
| `ingress.annotations`      | `{}`                                 |                                                         |
| `ingress.tls`               | `[]`                                 | Same shape as Ingress `spec.tls`                        |

## Development

```bash
make helm-lint   # helm lint
make helm-test   # helm-unittest, see devops/helm/comparia-landing/tests/
```

Requires the [helm-unittest](https://github.com/helm-unittest/helm-unittest)
plugin: `helm plugin install https://github.com/helm-unittest/helm-unittest`.
