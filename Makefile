.PHONY: helm-lint helm-test

HELM_CHART := devops/helm/comparia-landing

helm-lint: ## Lint the comparia-landing Helm chart
	helm lint $(HELM_CHART)

helm-test: ## Run the Helm chart's helm-unittest suite
	helm unittest $(HELM_CHART)
