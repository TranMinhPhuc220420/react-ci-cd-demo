# Todo List - Vercel CI/CD Demo

Ứng dụng Todo list đơn giản (React + Vite) dùng để demo quy trình CI/CD trên Vercel. Mỗi khi push commit vào nhánh `main`, Vercel tự động chạy **lint → test → build**. Chỉ khi cả 3 bước pass thì mới release lên Production.

## Tính năng

- Thêm, xóa, đánh dấu hoàn thành todo
- Lọc: All / Active / Completed
- Xóa tất cả todo đã hoàn thành
- Lưu trữ local (localStorage)
- Hiển thị commit SHA đang được deploy (để demo phiên bản release)

## Luồng CI/CD

```
git push → main
    ↓
Vercel Git integration trigger
    ↓
npm ci (install)
    ↓
npm run ci
    ├── npm run lint      → fail? → Build FAILED, không release
    ├── npm run test:run  → fail? → Build FAILED, không release
    └── npm run build     → fail? → Build FAILED, không release
    ↓
Release lên Production ✓
```

Điểm mấu chốt: `vercel.json` cấu hình `buildCommand: "npm run ci"`. Vercel coi Build Command trả về exit code != 0 là build fail → alias Production **không** được cập nhật.

## Chạy local

```bash
npm install
npm run dev        # dev server
npm run test       # test watch mode
npm run test:run   # test một lần (giống CI)
npm run lint       # eslint
npm run build      # build production
npm run ci         # chạy toàn bộ pipeline (lint + test + build)
```

## Kết nối Vercel

1. Push repo lên GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: todo list with Vercel CI/CD demo"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. Vào [vercel.com](https://vercel.com) → **Add New Project** → Import repo từ GitHub.

3. Vercel tự nhận framework Vite. Các cấu hình trong `vercel.json` sẽ được áp dụng:
   - **Build Command**: `npm run ci`
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`

4. Deploy. Mỗi push vào `main` sẽ trigger pipeline CI/CD.

## Demo CI/CD

### Scenario 1: Deploy thành công
1. Sửa code (ví dụ thêm todo mặc định)
2. Push lên `main`
3. Xem Vercel Dashboard → deployment chạy lint/test/build → **Ready**
4. Mở app → commit SHA ở footer đổi theo commit mới

### Scenario 2: Build fail (không release)
1. Tạm thời làm fail một test (ví dụ sửa assertion trong `src/lib/todos.test.js`)
2. Push lên `main`
3. Vercel báo **Build Failed** → Production giữ nguyên bản cũ
4. Revert commit fail → push lại → deploy thành công

## Cấu trúc dự án

```
src/
├── components/       # UI components (TodoInput, TodoList, TodoItem, TodoFilter, DeployInfo)
├── hooks/            # useTodos (state + localStorage)
├── lib/              # Pure functions (addTodo, toggleTodo, ...) + unit tests
├── test/             # Test setup
├── App.jsx           # Root component
└── main.jsx
```

## Tech stack

- React 19 + Vite 8
- Vitest + Testing Library
- ESLint
- Vercel (Git integration, không dùng GitHub Actions)
