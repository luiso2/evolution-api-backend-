# 🚀 DEPLOYMENT EN RAILWAY - PASOS FINALES

## ✅ Tu GitHub Repository
**https://github.com/luiso2/evolution-api-backend-.git**

## 🔴 IMPORTANTE: Falta package-lock.json

El package-lock.json se está generando ahora mismo. Una vez que termine (en unos segundos), necesitas agregarlo a GitHub:

### Paso 1: Agregar package-lock.json a GitHub
```bash
# Espera hasta que veas el archivo
ls -la | grep package-lock

# Cuando aparezca, agrégalo a git
git add package-lock.json
git commit -m "Add package-lock.json for Railway deployment"
git push origin main
```

### Paso 2: Deploy en Railway

#### Opción A: Railway Dashboard (Recomendado)
1. Ve a https://railway.com
2. Click en **"New Project"**
3. Selecciona **"Deploy from GitHub repo"**
4. Autoriza Railway para acceder a tu GitHub
5. Busca y selecciona **`evolution-api-backend-`**
6. Railway detectará automáticamente Nixpacks
7. Click en **"Deploy Now"**

#### Opción B: Railway CLI
```bash
# Si ya tienes el proyecto en Railway
railway link
railway up

# Si es nuevo
railway login
railway init
railway up
```

### Paso 3: Variables de Entorno en Railway

⚠️ **CRÍTICO**: Después del deploy, configura estas variables:

1. Ve a tu proyecto en Railway Dashboard
2. Click en **"Variables"** tab
3. Click en **"Raw Editor"**
4. Pega esto:

```env
NODE_ENV=production
EVOLUTION_API_URL=https://evolution-api-evolution-api.dqyvuv.easypanel.host
EVOLUTION_API_KEY=BC10D87095B7-44E2-B1A4-F03BE2BECE24
```

**NOTA**: NO configures `PORT` - Railway lo asigna automáticamente.

## 📊 Verificación del Deploy

Una vez desplegado, verifica:

```bash
# Reemplaza con tu URL de Railway
curl https://tu-app.railway.app/api/health
curl https://tu-app.railway.app/api/info
```

## 🔍 Si el Deploy Falla

1. **Check Build Logs**: Railway Dashboard → Build Logs
2. **Verifica**:
   - ✅ package-lock.json está en GitHub
   - ✅ NO hay Dockerfile (ya lo renombramos)
   - ✅ nixpacks.toml está presente
   - ✅ Variables de entorno configuradas

## 📁 Estado de Archivos

| Archivo | Estado | Necesario |
|---------|---------|-----------|
| package.json | ✅ En GitHub | SÍ |
| package-lock.json | ⏳ Generando | SÍ |
| nixpacks.toml | ✅ En GitHub | SÍ |
| railway.json | ✅ En GitHub | SÍ |
| Dockerfile | ❌ Renombrado | NO |
| .env | ⚠️ Local only | NO (usar Variables) |

## 🎯 Resumen de Acciones

1. **Espera** 30 segundos para que termine npm install
2. **Git push** del package-lock.json
3. **Deploy** desde Railway Dashboard
4. **Configura** variables de entorno
5. **Verifica** con los endpoints de health

## 💻 Tu servidor local sigue funcionando

http://localhost:3456 ✅

---

**Una vez que tengas package-lock.json y lo subas a GitHub, Railway debería hacer el deploy sin problemas.**