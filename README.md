# Pocket Studio Local

Standalone PC edition of Pocket Studio. This repository deploys the Local app at `/`; it does not deploy RunPod API proxy or storage helper endpoints. The existing RunPod site/repository is independent.

## Netlify deployment

Import `ranveerskh/pslocal` as a **new** Netlify site. Branch: `main`. Build command: `npm run build`. Publish directory: `dist`. Node 24 is configured in netlify.toml. Netlify Functions and Blobs provide encrypted metadata synchronization and approved four-digit device pairing. A static-only host without these functions cannot provide pairing/sync. No ComfyUI API token or Tailscale password belongs in the repository.

## Connect ComfyUI

1. Install current ComfyUI Desktop on the PC and install the model files required by the selected mode.
2. Keep its server on 127.0.0.1:8188. Add `--port 8188 --enable-cors-header https://YOUR-NEW-SITE.netlify.app` to its startup arguments and restart. Settings displays the exact CORS origin for the page you opened.
3. Install Tailscale on PC and phone, using the owner's own account on both. On PC run `tailscale serve --bg 8188` in an administrator terminal. If prompted, enable Serve through the supplied account link and repeat the command.
4. Open the resulting private `https://pc.tailnet.ts.net` URL on the phone to verify access.
5. Open this app at the new site's root, use Settings to save that HTTPS PC address, and test the connection.
6. To sync project records, create a fresh four-digit invitation in Settings on the first device, enter it on the second, then approve the second device on the first. The PC must remain online for original media playback. Do not reuse another person's pairing or PC address.

## Models

Z-Image uses z_image_turbo_int8_convrot.safetensors, qwen_3_4b_fp8_mixed.safetensors and ae.safetensors. Local MiniMax R2V uses the INT8 video VAE, audio VAE, ref2va model and its Qwen3VL encoder. Qwen 2.1 Standard and Turbo are separate choices; Turbo uses qwen_image_2.1_turbo_int8_convrot.safetensors with the exact eight-step schedule and CFG 1. The selected graph's nodes and model files are validated before connection.

## Existing users: move without losing data

Do not erase the old site's data during migration. Browser galleries/media and the old Netlify site's sync room do **not** automatically move to a new origin/site. Export important projects as ZIPs from the old site and import them on the new one. ZIP export excludes Hidden items and saved character presets; preserve those separately before moving. Set up a fresh pairing on the new site and re-add reference presets as needed. PC originals are unchanged. Update ComfyUI's allowed CORS origin to the new site's exact HTTPS origin.

## Storage and privacy

The app keeps device media, metadata, settings and pairing locally per browser. Sync metadata is encrypted; video bytes remain on the PC or device. Hide/Unhide and reference/project changes mirror on paired devices. Delete only removes records and copies on this browser. Settings has copyable PowerShell cleanup commands for original PC output media and an ERASE-confirmed reset of this browser's app data. Exports, PC originals, other devices and running ComfyUI jobs are kept.

## Development

`npm ci`

`npm run dev`

`npm run build`

`npm test`

Use Netlify's deployed functions or Netlify Dev to exercise pairing/sync. `npm run dev` alone can connect to a correctly configured PC but does not supply Netlify Functions.
