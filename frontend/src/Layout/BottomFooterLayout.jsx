export const BottomFooterLayout = ({ children }) => {
  return (
    <>
      {/* ヘッダーの縦幅と同じ高さをブロックを追加し、ヘッダーが被らないようにする */}
      <div className="h-24"></div>
      {/* 共通のボトムフッターのレイアウト */}
      <div className="footer-button">
        <div className="flex justify-center py-4">{children}</div>
      </div>
    </>
  );
};
