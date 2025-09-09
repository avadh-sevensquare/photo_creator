import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class GalleryPreview extends StatelessWidget {
  const GalleryPreview({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 180,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          _tile(120, 160, alignment: Alignment.bottomCenter),
          const SizedBox(width: 12),
          _tile(110, 140, alignment: Alignment.center),
          const SizedBox(width: 12),
          _tile(90, 120, alignment: Alignment.topCenter),
        ],
      ),
    );
  }

  Widget _tile(double width, double height, {required Alignment alignment}) {
    return Expanded(
      flex: width.toInt(),
      child: Container(
        height: height,
        decoration: BoxDecoration(
          color: const Color(0xFF1A2435),
          borderRadius: BorderRadius.circular(16),
          boxShadow: AppShadows.heroShadow,
          border: Border.all(color: Colors.white.withOpacity(0.06)),
        ),
        child: Stack(
          children: [
            Align(
              alignment: alignment,
              child: Container(
                width: double.infinity,
                height: double.infinity,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      Colors.white.withOpacity(0.08),
                      Colors.white.withOpacity(0.02),
                    ],
                  ),
                ),
              ),
            ),
            Positioned(
              right: 8,
              top: 8,
              child: Row(
                children: [
                  _badge(Icons.share),
                  const SizedBox(width: 6),
                  _badge(Icons.mode_comment_outlined),
                  const SizedBox(width: 6),
                  _badge(Icons.favorite_border),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _badge(IconData icon) {
    return Container(
      width: 24,
      height: 24,
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.35),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Icon(icon, size: 14, color: Colors.white),
    );
  }
}

