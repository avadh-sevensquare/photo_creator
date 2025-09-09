import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class GalleryPreview extends StatelessWidget {
  const GalleryPreview({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 220,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: const [
          Expanded(child: _TileStub(height: 160, alignment: Alignment.bottomLeft)),
          SizedBox(width: 12),
          Expanded(child: _TileStub(height: 220, alignment: Alignment.topCenter)),
          SizedBox(width: 12),
          Expanded(child: _TileStub(height: 180, alignment: Alignment.bottomRight)),
        ],
      ),
    );
  }
}

class _TileStub extends StatelessWidget {
  final double height;
  final Alignment alignment;
  const _TileStub({required this.height, required this.alignment});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      child: ClipRRect(
        borderRadius: AppRadii.card,
        child: Stack(
          fit: StackFit.expand,
          children: [
            Container(color: const Color(0xFF1B2434)),
            Positioned(
              top: alignment == Alignment.topCenter ? 10 : null,
              left: 10,
              child: _Badge(label: '❤ 120'),
            ),
            Positioned(
              bottom: 10,
              right: 10,
              child: Row(children: const [
                _Badge(label: '↗'),
                SizedBox(width: 6),
                _Badge(label: '💬 8'),
              ]),
            ),
          ],
        ),
      ),
    );
  }
}

class _Badge extends StatelessWidget {
  final String label;
  const _Badge({required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
      decoration: const BoxDecoration(
        color: Color(0xFF222E44),
        borderRadius: AppRadii.pill,
      ),
      child: Text(label, style: const TextStyle(color: Colors.white, fontSize: 12)),
    );
  }
}

