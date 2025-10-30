# 🚂 Railway Deployment Guide - Evolution API Backend

## ✅ Problemas Resueltos

He corregido los siguientes problemas para el deployment en Railway:

### 1. **package-lock.json**
- ✅ Regenerado correctamente
- ✅ Incluido en el repositorio

### 2. **TypeScript en Producción**
- ✅ Movido `typescript` a dependencies (no devDependencies)
- ✅ Añadido script `postinstall` que ejecuta el build automáticamente

### 3. **Configuración de Build**
- ✅ Creado `railway.json` con configuración específica
- ✅ Creado `nixpacks.toml` para configuración de build personalizada

## 📦 Archivos Modificados/Creados

1. **package.json** - Actualizado con:
   - Script `postinstall: "npm run build"`
   - TypeScript en dependencies
   - Eliminada duplicación de typescript

2. **railway.json** - Configuración de Railway:
   ```json
   {
     "build": {
       "buildCommand": "npm install && npm run build"
     },
     "deploy": {
       "startCommand": "npm start"
     }
   }
   ```

3. **nixpacks.toml** - Configuración de Nixpacks:
   ```toml
   [phases.install]
   cmds = ["npm ci --production=false"]

   [phases.build]
   cmds = ["npm run build"]
   ```

## 🚀 Pasos para Deploy en Railway

### 1. Preparación Local
```bash
# Asegúrate de que todo esté actualizado
cd "/Users/josemichaelhernandezvargas/Desktop/evolution api backend"
npm install
npm run build

# Verifica que funciona localmente
npm start
```

### 2. Git Setup
```bash
# Inicializa git si no está inicializado
git init

# Añade todos los archivos
git add .

# Commit con los cambios
git commit -m "Fix Railway deployment - Add package-lock.json and TypeScript configuration"
```

### 3. Deploy en Railway

#### Opción A: GitHub
1. Crea un repositorio en GitHub
2. Push el código:
   ```bash
   git remote add origin https://github.com/tu-usuario/evolution-api-backend.git
   git branch -M main
   git push -u origin main
   ```
3. En Railway: New Project → Deploy from GitHub repo
4. Selecciona tu repositorio

#### Opción B: Railway CLI
1. Instala Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login y deploy:
   ```bash
   railway login
   railway init
   railway up
   ```

### 4. Variables de Entorno en Railway

⚠️ **IMPORTANTE**: Configura estas variables en Railway Dashboard:

```env
NODE_ENV=production
PORT=3000
EVOLUTION_API_URL=https://evolution-api-evolution-api.dqyvuv.easypanel.host
EVOLUTION_API_KEY=BC10D87095B7-44E2-B1A4-F03BE2BECE24
```

**En Railway:**
1. Ve a tu proyecto
2. Click en "Variables"
3. Añade cada variable manualmente o usa "Raw Editor"

## 🔧 Solución de Problemas

### Error: "Cannot find module"
```bash
# Limpia y reinstala
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Error: "TypeScript not found"
- ✅ Ya resuelto - TypeScript está en dependencies

### Error: "Build failed"
- Verifica los logs en Railway Dashboard
- El build command debe ser: `npm install && npm run build`
- El start command debe ser: `npm start`

## 📊 Verificación Post-Deploy

Una vez desplegado:

1. **Check Health Endpoint:**
   ```bash
   curl https://tu-app.railway.app/api/health
   ```

2. **Check Info Endpoint:**
   ```bash
   curl https://tu-app.railway.app/api/info
   ```

## 🎯 Checklist Final

- [x] package.json actualizado
- [x] package-lock.json generado
- [x] TypeScript en dependencies
- [x] Script postinstall añadido
- [x] railway.json creado
- [x] nixpacks.toml creado
- [x] Build local exitoso
- [ ] Variables de entorno en Railway
- [ ] Deploy exitoso

## 💡 Tips

1. **Siempre haz commit del package-lock.json**
2. **Verifica que el build funciona localmente antes de hacer push**
3. **Revisa los logs de Railway para debugging**
4. **El PORT será asignado automáticamente por Railway, no lo hardcodees**

## 🆘 Si Aún Falla

1. Comparte el error exacto de Railway
2. Verifica los Build Logs en Railway Dashboard
3. Asegúrate de que todas las variables de entorno están configuradas

---

**El proyecto está listo para Railway. Solo necesitas hacer git push y configurar las variables de entorno.**