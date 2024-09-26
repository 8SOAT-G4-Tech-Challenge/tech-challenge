#!/bin/bash

# Criar o Namespace
kubectl apply -f deploy/kubernetes/config/namespace-config.yaml

# Criar a Secret e ConfigMap
kubectl apply -f deploy/kubernetes/config/secret-config.yaml
kubectl apply -f deploy/kubernetes/config/env-config.yaml

# Aplicar os Volumes
kubectl apply -f deploy/kubernetes/volume/volume-pv.yaml
kubectl apply -f deploy/kubernetes/volume/volume-pvc.yaml

# Rodar o Service e Deployment do Banco de Dados PostgresSQL
kubectl apply -f deploy/kubernetes/database/postgres-service.yaml
kubectl apply -f deploy/kubernetes/database/postgres-deployment.yaml

# Rodar o Job para criação do banco e tabelas da aplicação
kubectl apply -f deploy/kubernetes/migration/migration-job.yaml

# Rodar a API (Service, Deployment, e HPA)
kubectl apply -f deploy/kubernetes/api/api-service.yaml
kubectl apply -f deploy/kubernetes/api/api-deployment.yaml
kubectl apply -f deploy/kubernetes/api/api-hpa.yaml

# Rodar o Prisma Studio (opcional)
kubectl apply -f deploy/kubernetes/prisma-studio/prisma-service.yaml
kubectl apply -f deploy/kubernetes/prisma-studio/prisma-deployment.yaml

echo "Deployment completo!"
