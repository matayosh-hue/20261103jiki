import React, { useState } from 'react';
import { UnitData } from '../data/curriculumData';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, QrCode, ExternalLink, Share2, Download, Smartphone, Laptop } from 'lucide-react';

interface Props {
  unit: UnitData;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareQrModal: React.FC<Props> = ({ unit, isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // Generate deep-link share URL for the selected unit
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?unit=${encodeURIComponent(unit.id)}`
    : `https://example.com?unit=${encodeURIComponent(unit.id)}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    const svgElement = document.getElementById('unit-qr-code-svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 400, 400);
        ctx.drawImage(img, 0, 0, 400, 400);
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `QR_${unit.subject}_${unit.gradeLabel}_${unit.unitName}.png`;
        downloadLink.href = pngUrl;
        downloadLink.click();
      }
    };

    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                単元情報の共有・QRコード
              </h3>
              <p className="text-[11px] text-slate-500">
                スマートフォンやタブレットで瞬時に開けます
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-center flex flex-col items-center">
          {/* Target Unit Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 w-full text-left space-y-0.5">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="font-bold text-indigo-700">{unit.subject}</span>
              <span>·</span>
              <span>{unit.gradeLabel}</span>
              <span>·</span>
              <span className="truncate">{unit.domain}</span>
            </div>
            <div className="font-bold text-slate-900 text-sm truncate">
              {unit.unitName}
            </div>
          </div>

          {/* QR Code Container */}
          <div className="p-4 bg-white rounded-2xl border-2 border-indigo-100 shadow-md flex flex-col items-center justify-center">
            <div className="p-2 bg-white rounded-xl">
              <QRCodeSVG
                id="unit-qr-code-svg"
                value={shareUrl}
                size={180}
                level="H"
                includeMargin={true}
                fgColor="#0f172a"
                bgColor="#ffffff"
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 font-mono">
              端末のカメラで読み取ってください
            </span>
          </div>

          {/* Action Buttons: Copy URL & Download PNG */}
          <div className="w-full space-y-2">
            <button
              onClick={handleCopyUrl}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  URLをクリップボードにコピーしました！
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  単元の共有リンク（URL）をコピー
                </>
              )}
            </button>

            <button
              onClick={handleDownloadQr}
              className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              QRコード画像を保存（指導案・スライド用 PNG）
            </button>
          </div>

          {/* Helpful Teachers Note */}
          <div className="w-full bg-indigo-50/60 border border-indigo-100 rounded-lg p-2.5 text-[11px] text-slate-600 text-left space-y-1">
            <div className="font-bold text-indigo-900 flex items-center gap-1">
              <Share2 className="w-3 h-3 text-indigo-600" />
              校内での活用シーン：
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
              <li>職員室の指導案検討会でプロジェクターや手元端末に表示</li>
              <li>児童用タブレットにQRを配布してワークシートやシミュレーターを操作</li>
              <li>学年通信や研究だよりにQRコードを印刷して共有</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
